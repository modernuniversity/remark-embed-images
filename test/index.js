import path from 'path'
import test from 'tape'
import {remark} from 'remark'
import {read} from 'to-vfile'
import remarkHtml from 'remark-html'
import remarkEmbedImages from '../index.js'

test('remark-embed-images', async (t) => {
  t.plan(5)

  t.deepEqual(
    String(
      await remark()
        .use(remarkEmbedImages)
        .process(await read(path.join('test', 'fixtures', 'foo.md')))
    ),
    String(await read(path.join('test', 'fixtures', 'foo-result.md'))).replace(
      /\r\n/g,
      '\n'
    ),
    'should inline images'
  )

  t.deepEqual(
    String(
      await remark()
        .use(remarkEmbedImages)
        .use(remarkHtml)
        .process(await read(path.join('test', 'fixtures', 'foo.md')))
    ),
    String(
      await read(path.join('test', 'fixtures', 'foo-result.html'))
    ).replace(/\r\n/g, '\n'),
    'should integrate with remark-html'
  )

  try {
    await remark()
      .use(remarkEmbedImages)
      .process(await read(path.join('test', 'fixtures', 'error.md')))
  } catch {
    t.pass('should fail on missing images')
  }

  t.deepEqual(
    String(
      await remark()
        .use(remarkEmbedImages)
        .process(await read(path.join('test', 'fixtures', 'empty.md')))
    ),
    String(await read(path.join('test', 'fixtures', 'empty.md'))).replace(
      /\r\n/g,
      '\n'
    ),
    'should work on documents without images'
  )

  t.deepEqual(
    String(
      await remark()
        .use(remarkEmbedImages)
        .process(await read(path.join('test', 'fixtures', 'unknown-mime.md')))
    ),
    String(
      await read(path.join('test', 'fixtures', 'unknown-mime.md'))
    ).replace(/\r\n/g, '\n'),
    'should ignore extensions that are unknown'
  )
})
