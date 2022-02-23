# Deploying

Clients can consume these embeds in two different ways - either through a CDN or via NPM.

## Deploying to a CDN

_These steps are for deploying to AWS' S3 and CloudFront. They should be fairly analogous to any other CDN solution, but names and specifics will be different._

_You do not need to deploy `clients/common` to a CDN - the build process for the embeds will handle it._

1. Set up an [S3 Bucket](https://aws.amazon.com/s3/) via AWS S3 Console. Default configuration is fine.
2. Set up a [CloudFront](https://aws.amazon.com/cloudfront/) distribution from that S3 bucket via AWS CloudFront console.  
   You can add a CName and a SSL certificate here if those are available to you.
3. Build both the scheduler and appointments embeds.  
   From the `clients` directory, run `yarn workspace @canvas-medical/embed-scheduler build` to build the scheduler embed.  
   From the `clients` directory, run `yarn workspace @canvas-medical/embed-appointments build` to build the appointments embed.
4. Upload the resulting `scheduler.js` and `appointments.js` to your S3 bucket via AWS S3 Console.
   You'll find these in `clients/scheduler/dist/` and `clients/appointments/dist/`
5. Provide your clients with the URLs for these JavaScript files.  
   These will be `https://{your CloudFront CName}/scheduler.js` and `https://{your CloudFront CName}/appointments.js`.

## Publishing to NPM

1. Update the version number in the `package.json` of `clients/appointments`, `clients/common`, and `clients/scheduler`. (You only need to update the ones you're publishing)
2. (If publishing a new version of `clients/common`) In the `package.json` of `clients/appointments` and `clients/scheduler`, update the version number of `@canvas-medical/embed-common` to match the new version in `clients/common`.
3. Run `yarn build:esm` for each package you are publishing. From the `clients` directory, you would run:  
   `yarn workspace @canvas-medical/embed-common build:esm`
   `yarn workspace @canvas-medical/embed-appointments build:esm`
   `yarn workspace @canvas-medical/embed-scheduler build:esm`
4. Run `yarn publish --access public` for each package you are publishing. **If you are publishing a new version of `clients/common` it must be first.**
   `yarn workspace @canvas-medical/embed-common publish --access public`
   `yarn workspace @canvas-medical/embed-appointments publish --access public`
   `yarn workspace @canvas-medical/embed-scheduler publish --access public`
5. Verify your new versions are available on NPM!
