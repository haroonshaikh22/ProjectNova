import  {ApiResponse} from '../utils/api-response.js';
import { asyncHandler } from '../utils/async-handler.js';


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * 
  const healthCheck = async (req, res,next) => {
    try {
     const user = await getUserFromDB()
         res.status(200).json(new ApiResponse(200, {message :  "Health check successful"})) 
        
    } catch (error) {
         next(error);
    }
   
};
 * 
 * 
 */

     const healthCheck = asyncHandler((req,res) => {
          res.status(200).json(new ApiResponse(200, {message :  "Health check successful"}))

     })

export {healthCheck};

