const Joi = require('joi'); 

// validating with joi

const validateParams = (schema) => { 
  return (req, res, next) => { 
  const { error } = schema.validate(req.body);
  const valid = error == null; 
  
  if (valid) { 
    next(); 
  } else { 
    const { details } = error; 
    const message = details.map(i => i.message).join(',');
 
    console.log("error", message); 
   res.status(422).json({ error: message }) } 
  }
}

// password must contain at least eight characters, at least one number and both lower and uppercase letters and special characters


// manual validation


// const validateParams = function (requestParams) {
//     return function (req, res, next) {
//         for (let param of requestParams) {
//           console.log(Object.keys(req.body));
//             if (checkParamPresent(Object.keys(req.body), param)) {
//                 let reqParam = req.body[param.param_key];
//                 if (!checkParamType(reqParam, param)) {
//                     return res.send(400, {
//                         status: 400,
//                         result: `${param.param_key} is of type ` +
//                         `${typeof reqParam} but should be ${param.type}`
//                     });
//                 } else {
//                     if (!runValidators(reqParam, param)) {
//                         return res.send(400, {
//                             status: 400,
//                             result: `Validation failed for ${param.param_key}`
//                         });
//                     }
//                 }
//             } else if (param.required){
//                 return res.send(400, {
//                     status: 400,
//                     result: `Missing Parameter ${param.param_key}`
//                 });
//             }
//         }
//         next();
//     }
// };

// const checkParamPresent = function (reqParams, paramObj) {
//     return (reqParams.includes(paramObj.param_key));
// };

// const checkParamType = function (reqParam, paramObj) {
//     const reqParamType = typeof reqParam;
//     return reqParamType === paramObj.type;
// };

// const runValidators = function (reqParam, paramObj) {
//     for (let validator of paramObj.validator_functions) {
//         if (!validator(reqParam)) {
//             return false
//         }
//     }
//     return true;
// };

module.exports = {
    validateParams: validateParams
};