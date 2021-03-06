/**
 * RNS3
 */

import { Request } from './Request'
import { setBodyAsParsedXML } from './utils';
import { S3Policy } from './S3Policy'

const AWS_DEFAULT_S3_HOST = 's3.amazonaws.com'

export class RNS3 {
  static put(file, options, policy) {
    if (!policy) {
      policy = S3Policy.generate({
        ...options,
        key: (options.keyPrefix || '') + file.name,
        date: new Date,
        contentType: file.type
      })
    }
    const url = `https://${options.bucket}.${options.awsUrl || AWS_DEFAULT_S3_HOST}`
    const method = "POST"

    return Request.create(url, method, policy)
      .set("file", file)
      .send()
      .then(setBodyAsParsedXML)
  }
}
