//This is where all our routes , that is nothing but HTTP methods that we implement 

//contact routes
//CRUD API contacts --> api/contact

const express = require("express");
const router = express.Router();
const Contact = require("../models/contact.js");

//  /api/contact/

//Create functionality
router.post("/contact/", async (req, res)=>{
    try {
        const newContact = new Contact(req.body);
        newContact.save().then((savedContact)=> {
            console.log(savedContact);
            res.status(201).json({msg: "Contact saved successfully"});
        }
        ).catch((error)=> {
            console.log(error);

            //custom error handling

            if (error.code === 11000 &&  error.keyPattern.emailAddress){
                res.status(500).json({msg: "Email address already in use"});

            }else{

                res.status(500).json({msg: "Unable to create new contact"});

            }


            
        });

    }catch (error){
        console.log(error);
        res.status(500).json({msg: "Unable to save contact"});
    }

});


//Read functionality - read all contacts
router.get("/contact/", async (req, res)=> {
    try {
            Contact.find().then((contacts)=>{
            console.log(contacts);
            res.status(200).json({contacts: contacts});
        }).catch(()=> {
            console.log(error);
            res.status(500).json({msg: "Unable to get contacts"});
        });

    } catch (error){
        console.log(error);
        res.status(500).json({msg: "Unable to get contacts"});

    }

});

//Read functionality = read one contact
//  /api/contact/9/
router.get("/contact/:id/", async (req, res)=> {
    try {

        const {id} = req.params;
            Contact.findById(id).then((contact)=>{
            console.log(contact);
            res.status(200).json({contact: contact});
        }).catch((error)=> {
            console.log(error);
            res.status(500).json({msg: "Unable to get contact"});
        });

    } catch (error){
        console.log(error);
        res.status(500).json({msg: "Unable to get contact"});

    }

});

//search functionality --> search contact

router.get("/contacts/search/", async (req, res)=> {

    try {

        const {searchTerm} = req.query;
        console.log(searchTerm);
        const searchRegex = new RegExp(searchTerm, "i") // i- case insensitive - lowercase 
         Contact.find({$or: [{firstName: searchRegex}, {lastName: searchRegex}, {emailAddress: searchRegex}]})
        .then((contacts)=>{

            if (contacts.length !== 0){
                console.log(contacts);
                res.status(200).json({contacts: contacts});

            }else{
                console.log(contacts);
                res.status(200).json({contacts: [], msg: "No matching records found"});
            }


           
        }).catch((error)=> {
            console.log(error);
            res.status(500).json({msg: "Unable to get search contacts"});
        });

    } catch (error){
        console.log(error);
        res.status(500).json({msg: "No matching data found"});

    }


});

//update functionality 
router.put("/contact/:id/", async (req, res)=> {
    try{
        const {id} = req.params;
        const updtaedContact = req.body;
        await Contact.findOneAndUpdate({_id: id}, updtaedContact, {new: true})
        .then(
            (updatedContact)=> {
                console.log(updatedContact);
                res.status(200).json({msg: "contact updated successfully", contact: updatedContact});
            }

        ).catch((error)=> {
            console.log(error);
            res.status(500).json({msg: "Unable to Update the contact"});
        });

    }catch (error){
        console.log(error);
        res.status(500).json({msg: "Unable to Update the contact"});

    }
});

//Types of deletes
//soft delete -> update the field "active" --> Y/N
//hard delete -> deletion of record / document

router.delete("/contact/:id/", async (req, res)=> {
    try{
        const {id} = req.params;
        await Contact.findByIdAndDelete({_id: id})
        .then((deletedContact)=> {
            console.log(deletedContact);
            res.status(200).json({msg: "Contact Successfully deleted", contact: deletedContact})

        }).catch((error)=> {
            console.log(error);
            res.status(500).json({msg: "Unable to delete the contact"});
        });

    }catch (error){
        console.log(error);
        res.status(500).json({msg: "Unable to delete the contact"});

    }
});




module.exports = router;