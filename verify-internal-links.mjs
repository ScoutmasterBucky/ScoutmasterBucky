#!/usr/bin/env node
import { CheckHtmlLinksCli } from 'check-html-links';

// The check-html-links CLI exits 0 even when links are broken, so run it
// directly and fail the build ourselves.
const cli = new CheckHtmlLinksCli({ argv: [] });
cli.setOptions({ rootDir: 'dist', continueOnError: true });
const { errors } = await cli.run();

if (errors.length > 0) {
    process.exit(1);
}
