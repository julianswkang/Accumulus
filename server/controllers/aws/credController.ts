import stsClient from './stsController';
import * as types from '../../types';
import { AssumeRoleCommand } from '@aws-sdk/client-sts';

const credController: Record<string, types.middlewareFunction> = {};

credController.getCreds = async (req, res, next) => {
  const { arn, externalId } = res.locals.userData;
  const roleParams = {
    RoleArn: arn,
    RoleSessionName: 'DoesThisNotMatter',
    ExternalId: externalId,
  };

  try {
    const assumedRole = await stsClient.send(new AssumeRoleCommand(roleParams));
    if (assumedRole.Credentials !== undefined) {
      const accessKeyId = assumedRole.Credentials.AccessKeyId;
      const secretAccessKey = assumedRole.Credentials.SecretAccessKey;
      const sessionToken = assumedRole.Credentials.SessionToken;
      console.log('credController.getCreds GOT ACCESS KEY: ', accessKeyId);
      res.locals.credentials = { accessKeyId, secretAccessKey, sessionToken };
      console.log(res.locals.credentials);
      return next();
    } else {
      console.log(
        'credController.getCreds assumedRole.Credentials is undefined'
      );
      return next();
    }
  } catch (err) {
    console.log(
      'credController.getCreds ERROR: fail to send role params to stsClient'
    );
    next(err);
  }
};

export default credController;
