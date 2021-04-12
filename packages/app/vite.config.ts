import { defineConfig, PluginOption } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import { transformAsync, TransformOptions } from '@babel/core'

const createRequireRegex = () => /require\('(.*)'\)/g

const escapeRegexString = (str: string) =>
  str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')

/**
 * Collects all require calls and converts them to top level imports.
 */
const requireToImport = (content: string) => {
  const requirePaths = new Set<string>()
  const regex = createRequireRegex()
  let result: null | RegExpExecArray = null
  while (true) {
    result = regex.exec(content)
    if (result === null) {
      break
    }
    requirePaths.add(result[1])
  }

  for (const requirePath of requirePaths) {
    const [baseName] = requirePath.replace('./', '').split('.')
    content =
      `import ${baseName} from "${requirePath.replace('.ts', '')}";\n` +
      content.replace(
        new RegExp(escapeRegexString(`require('${requirePath}')`), 'g'),
        baseName,
      )
  }

  return content
}

const graphQlPlugin: () => PluginOption = () => ({
  name: 'graphql',
  enforce: 'pre',
  async transform(source, id) {
    if (!/\.graphql\..*/.test(id)) return null
    return { code: requireToImport(source) }
  },
})

const babelPlugin: () => PluginOption = () => ({
  name: 'babel',
  enforce: 'pre',
  async transform(source, id) {
    if (!id.endsWith('.ts') && !id.endsWith('.tsx')) {
      return null
    }
    const options: TransformOptions = {
      filename: id,
      sourceMaps: true,
    }
    const result = await transformAsync(source, options)
    if (!result) {
      throw new Error('Could not transform.')
    }
    const { code, map } = result
    if (!code) {
      throw new Error('Could not transform.')
    }
    return { code, map }
  },
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [babelPlugin(), graphQlPlugin(), reactRefresh()],
  define: {
    global: 'window',
    'process.env.NODE_ENV': JSON.stringify('development'),
  },
  build: {
    minify: 'esbuild',
  },
  server: {
    proxy: {
      '/graphql': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        ws: true,
      },
    },
  },
})
