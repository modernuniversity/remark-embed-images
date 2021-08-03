# remark-embed-images

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[**remark**][remark] plugin to embed local images as data URIs, inlining files
as base64-encoded values.

## Note!

This plugin is ready for the new parser in remark
([`remarkjs/remark#536`](https://github.com/remarkjs/remark/pull/536)).
No change is needed: it works exactly the same now as it did before!

## Install

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c):
Node 12+ is needed to use it and it must be `import`ed instead of `require`d.

[npm][]:

```sh
npm install remark-embed-images
```

## Use

Say we have an image, [`foo.png`][foo.png], and next to it the following file,
`example.md`:

```markdown
![A PNG file](./foo.png)
```

And our script, `example.js`, looks as follows:

```js
import {readSync} from 'to-vfile'
import {remark} from 'remark'
import remarkEmbedImages from 'remark-embed-images'

const file = readSync('example.md')

remark()
  .use(remarkEmbedImages)
  .process(file)
  .then((file) => {
    console.log(String(file))
  })
```

Now, running `node example` yields:

```markdown
![A PNG file](data:image/png;base64,iVBORw0…)
```

## API

This package exports no identifiers.
The default export is `remarkEmbedImages`.

### `unified().use(remarkEmbedImages)`

Embed local images as data URIs, inlining files as base64-encoded values.

## Security

Although this plugin should be safe to use, always be careful with user input.
For example, it’s possible to hide JavaScript inside images (such as GIFs,
WebPs, and SVGs).
User provided images open you up to a [cross-site scripting (XSS)][xss] attack.

## Contribute

See [`contributing.md`][contributing] in [`remarkjs/.github`][health] for ways
to get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [David Herges][author]

<!-- Definitions -->

[build-badge]: https://github.com/remarkjs/remark-embed-images/workflows/main/badge.svg

[build]: https://github.com/remarkjs/remark-embed-images/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/remarkjs/remark-embed-images.svg

[coverage]: https://codecov.io/github/remarkjs/remark-embed-images

[downloads-badge]: https://img.shields.io/npm/dm/remark-embed-images.svg

[downloads]: https://www.npmjs.com/package/remark-embed-images

[size-badge]: https://img.shields.io/bundlephobia/minzip/remark-embed-images.svg

[size]: https://bundlephobia.com/result?p=remark-embed-images

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/remarkjs/remark/discussions

[npm]: https://docs.npmjs.com/cli/install

[health]: https://github.com/remarkjs/.github

[contributing]: https://github.com/remarkjs/.github/blob/HEAD/contributing.md

[support]: https://github.com/remarkjs/.github/blob/HEAD/support.md

[coc]: https://github.com/remarkjs/.github/blob/HEAD/code-of-conduct.md

[license]: license

[author]: https://spektrakel.de

[remark]: https://github.com/remarkjs/remark

[foo.png]: test/fixtures/foo.png

[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting
