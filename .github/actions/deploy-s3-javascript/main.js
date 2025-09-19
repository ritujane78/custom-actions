const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec')
function run() {
    const bucket = core.getInput('bucket', {required: true})
    const region = core.getInput('region', {required: true})
    const distFolder = core.getInput('dist-folder', {required: true})

    const s3URI = `s3://${bucket}`
    exec.exec(`aws s3 sync ${distFolder} ${s3URI} --region ${region}`)

    const websiteURL = `http://${bucket}.s3-website-${region}.amazonaws.com`
    core.setOutput('website-url', websiteURL)

    core.notice('Hello from my custom JavaScript Action.');

}

run();