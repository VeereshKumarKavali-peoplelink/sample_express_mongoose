const express = require("express");
const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First Name is required"],
        minLength: 3,
        maxLength: 20,
        trim: true,
        validate: {
            validator: function (value) {
                const nameRegex = /^[a-zA-Z\s]*$/;
                return nameRegex.test(value);
            },
            message: "First Name should contain only alphabetic characters"
        },
       
    },

    lastName: {
        type: String,
        required: [true, "Last Name is required"]
    },
    emailAddress: {
        type: String,
        required: true,
        unique: true,

    },
    age: {
        type: Number,
        required: false
    },




});

module.exports = mongoose.model("Contact", contactSchema);