const Post = require("../models/Post.model");
const { } = require("../validators/post.validators");

const controller = {};


controller.save = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        const { id } = req.params;

        let post = await Post.findById(id);

        if(!post) {
            post = new Post();
        }

        post["title"] = title;
        post["description"] = description;

        const postSaved = await post.save();

        if (!postSaved) {
            return res.status(409).json({ error: "Error creating post" });
        }
        
        return res.status(201).json(postSaved)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

controller.FindAll = async (req, res, next) => {
    try {
        const posts = await Post.find();

        return res.status(200).json({posts});
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: "Internal Server Error"});
    }
}

controller.deletePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedPost = await Post.findByIdAndDelete(id);
        if(!deletedPost) {
            return res.status(404).json({ error: "Post not found!"});
        } 
        res.status(200).json({message: "Post deleted successfully!"});
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: "Error deleting post"});
    }
}

controller.updatePost = async (req, res, next) => {
    try {
        //Obtener el id de la publicacion a editar
        const { id } = req.params;

        //Obtener el contenido que se desea editar
        const { body } = req;

        //Verificar si la publicacion existe y si existe, ejecutar los cambios
        const toBeUpdatedPost = await Post.findByIdAndUpdate(id, body, {
            new: true
        });
        if (!toBeUpdatedPost) return res.status(404).json({ error: "Post not found"});
        
        //Si la modificacion fue exitosa
        res.status(200).json({ message: "The post was updated successfully!"});
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: "Post not updated"});
    }
}

module.exports = controller;