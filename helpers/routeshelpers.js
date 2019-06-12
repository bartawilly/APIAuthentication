const Joi = require('joi');

module.exports = {
    validateBody:(schema) => {
        return (req, res, next) => {
            const result = Joi.validate(req.body, schema);
            if(result.error){
                return res.status(400).json(result.error);
            }
            if(!req.value){req.value = {};}
            req.value['body'] = result.value;
            next();
        }
    },

    schemas:{
        signinSchema: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }),
        signupSchema: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            firstname: Joi.string().required(),
            lastname: Joi.string().required()
        }),
        groupSchema:Joi.object().keys({
            name: Joi.string().required()
        }),
        removeGroupSchema:Joi.object().keys({
            name: Joi.string().required()
        }),
        addUserGroupSchema:Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().email().required()
        }),
        updateUser:Joi.object().keys({
            email: Joi.string().email().required(),
            firstname: Joi.string().required(),
            lastname: Joi.string().required()
        }),
        updateUserPassword:Joi.object().keys({
            password: Joi.string().required()
        }),
        makeAdmin:Joi.object().keys({
            id: Joi.required()
        }),
        removeAdmin:Joi.object().keys({
            id: Joi.required()
        }),
        removeUser:Joi.object().keys({
            id: Joi.required()
        }),
        providerSchema:Joi.object().keys({
            id: Joi.optional(),
            name: Joi.string().required(),
            address: Joi.string().required(),
            email: Joi.string().email().required(),
            phone: Joi.string().required()
        }),
        removeProviderSchema:Joi.object().keys({
            id: Joi.required()
        }),
        categorySchema:Joi.object().keys({
            id: Joi.optional(),
            name: Joi.string().required()
        }),
        removeCategorySchema:Joi.object().keys({
            id: Joi.required()
        }),
        customerSchema:Joi.object().keys({
            id: Joi.optional(),
            name: Joi.string().required(),
            mobile: Joi.string().required()
        }),
        removeCustomerSchema:Joi.object().keys({
            id: Joi.required()
        }),
        expenseSchema:Joi.object().keys({
            id: Joi.optional(),
            name: Joi.string().required(),
            amount: Joi.string().required()
        }),
        removeExpenseSchema:Joi.object().keys({
            id: Joi.required()
        }),
        voucherSchema:Joi.object().keys({
            id: Joi.optional(),
            text: Joi.string().required(),
            startAt: Joi.date().required(),
            expireAt: Joi.date().required(),
            percentage: Joi.number().required()
        }),
        removeVoucherSchema:Joi.object().keys({
            id: Joi.required()
        }),
        itemSchema:Joi.object().keys({
            id: Joi.optional(),
            code: Joi.string().required(),
            name: Joi.string().required(),
            cost: Joi.number().required(),
            price: Joi.number().required(),
            quantity: Joi.number().required(),
            discount: Joi.number().optional(),
            providerId: Joi.number().required(),
            categoryId: Joi.number().required()

        }),
        removeItemSchema:Joi.object().keys({
            id: Joi.required()
        }),
        updateItemQuantitySchema:Joi.object().keys({
            itemId: Joi.required(),
            quantity: Joi.number().required()
        }),
        paymentSchema:Joi.object().keys({
            id: Joi.optional(),
            type: Joi.string().required()
        
        }),
        removePaymentSchema:Joi.object().keys({
            id: Joi.required()
        }),
        previewBillSchema:Joi.object().keys({
            itemId: Joi.array().required(),
            itemCode:Joi.array().required(),
            ItemQuantity:Joi.array().required(),
            itemFinalPrice:Joi.array().required(),
            itemFinalTotalPrice:Joi.array().required(),
            totalAmount:Joi.number().required(),
            taxpercentage:Joi.number().optional(),
            taxAmount:Joi.number().optional(),
            finalTotalAmount:Joi.number().required(),
            customerMobile:Joi.string().required(),
            customerId:Joi.number().required(),
            paymentId:Joi.number().required(),
            voucherText:Joi.string().required(),
            voucherId:Joi.number().required()
        })
    }
}