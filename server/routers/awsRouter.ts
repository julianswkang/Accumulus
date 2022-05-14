import express, { Response, Request, NextFunction } from 'express';
import lambdaController from '../controllers/aws/lambdaController';
import credController from '../controllers/aws/credController';
import cwController from '../controllers/aws/cloudwatchController';
import costController from '../controllers/aws/costController';
import logController from '../controllers/aws/logController';
import stepController from '../controllers/aws/stepFuncs/stepController';
import cookieController from '../controllers/cookieController';
import analysisController from '../controllers/aws/analysisController';
// import * as types from '../types';

const router = express.Router();

router.post(
  '/lambdaNames',
  cookieController.getCookieCredentials,
  credController.getCreds, // credentials go into res.locals.credentials
  lambdaController.getFunctions, // function details go into res.locals.lambdaFunctions
  (req: express.Request, res: express.Response) => {
    // console.log('SHOULD SHOW COOKIES HERE:', req.cookies)
    res.status(200).json(res.locals.funcNames);
  }
);

router.post(
  '/lambda',
  cookieController.getCookieCredentials,
  credController.getCreds, // credentials go into res.locals.credentials
  lambdaController.getFunctions, // function details go into res.locals.lambdaFunctions
  (req: express.Request, res: express.Response) => {
    // console.log('SHOULD SHOW COOKIES HERE:', req.cookies)
    res.status(200).json(res.locals.lambdaFunctions);
  }
);

router.post(
  '/metricsTotalFuncs/:metric/:period/:stat',
  cookieController.getCookieCredentials,
  credController.getCreds,
  cwController.getMetricsTotalLambda,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.data);
  }
);

router.post(
  '/metricsEachFunc/:metric/:period/:stat',
  cookieController.getCookieCredentials,
  credController.getCreds,
  lambdaController.getFunctions,
  cwController.getMetricsEachLambda,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals[req.params.metric]);
  }
);

router.post(
  '/rankFuncsByMetric/:metric/:period/:stat',
  cookieController.getCookieCredentials,
  credController.getCreds,
  lambdaController.getFunctions,
  cwController.rankFuncsByMetric,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.functionRankings);
  }
);

router.post(
  '/costEachFunction/:period',
  cookieController.getCookieCredentials, // user data goes into res.locals.userData
  credController.getCreds,
  lambdaController.getFunctions, // res.locals.funcNames & res.locals.lambdaFunctions
  (req: Request, res: Response, next: NextFunction) => {
    req.params.metric = 'Invocations';
    req.params.stat = 'Sum';
    next();
  },
  cwController.getMetricsEachLambda,
  (req: Request, res: Response, next: NextFunction) => {
    req.params.metric = 'Duration';
    req.params.stat = 'Sum';
    next();
  },
  cwController.getMetricsEachLambda,
  costController.calcCostEachLambda,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.costData);
  }
);

router.post(
  '/lambdaLogs/:function/:period',
  cookieController.getCookieCredentials,
  credController.getCreds,
  logController.getLambdaLogs,
  analysisController.calcMetrics,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.logs);
  }
);

router.post(
  '/lambdaErrorLogsByFunc/:function/:period',
  cookieController.getCookieCredentials,
  credController.getCreds,
  logController.getLambdaErrorsByFunc,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.logs);
  }
);

router.post(
  '/lambdaErrorLogsEachFunc/:period',
  cookieController.getCookieCredentials,
  credController.getCreds,
  lambdaController.getFunctions,
  logController.getLambdaErrorsEachFunc,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.logs);
  }
);

router.post(
  '/lambdaLogMetricsByFunc/:function/:period',
  cookieController.getCookieCredentials,
  credController.getCreds,
  logController.getLambdaLogs,
  analysisController.calcMetrics,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.data);
  }
);

router.post(
  '/lambdaLogMetricsByFunc/:function/:period',
  cookieController.getCookieCredentials,
  credController.getCreds,
  logController.getLambdaLogs,
  analysisController.calcMetrics,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.data);
  }
);

router.post(
  '/stateMetricsByFunc/:metric/:period/:stat',
  cookieController.getCookieCredentials,
  credController.getCreds,
  stepController.getStateMetricByFunc,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.lambdaMetricsAllFuncs);
  }
);

export default router;
