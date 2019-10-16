// here we're going to have an abstract function using joi for validating user
// input https://github.com/hapijs/joi

const Joi = require('joi');

module.exports = {
    validateBody: (schema) => {
        return (req, res, next) => {

            const result = Joi.validate(req.body, schema);
            if (result.error) 
                // this will tell the client that there are errors
                return res.status(400).json(result.error);
            
            // validated values are in req.value.body if it's there
            if (!req.value) {
                req.value = {};
            }
            req.value['body'] = result.value;
            // the next allows the middleware to pass through
            next();
        }

    },
    schemas: {
        authSchema: Joi
            .object()
            .keys({
                /**
         * Expects:
         * - firstName
         * - lastName
         * - email
         * - subject list
         * - where they study / credentials
         * - small bio
         * - tutor/tutee
         * - dob
         * ! will add profile picture later
         * - profile picture
         */
                firstName: Joi
                    .string()
                    .required(),
                lastName: Joi
                    .string()
                    .required(),
                email: Joi
                    .string()
                    .email()
                    .required(),
                password: Joi.string().min(8).required(),
                subjects: Joi
                    .array()
                    .items(Joi.string())
                    .required(),
                //institution is university
                institution: Joi.string(),
                // status is tutor or tutee 
                status: Joi.string().required().regex(/^(tutor|tutee)$/),
                bio: Joi
                    .string()
                    .max(250)
                    .required(),
                dob: Joi
                    .date()
                    .required()
            }),
            loginSchema: Joi.object().keys({
                email: Joi
                    .string()
                    .email()
                    .required(),
                password: Joi.string().min(8).required(),
            })
    }
}
