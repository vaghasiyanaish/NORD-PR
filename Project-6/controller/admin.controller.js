 const Admin = require("../model/admin.model");
const path = require("path");
const fs = require("fs");

exports.addAdminPage = async (req, res) => {
    if (!req.cookies?.admin?._id) return res.redirect("/");
    let admin = await Admin.findById(req.cookies.admin._id);
    return res.render("addAdmin", { admin });
};

exports.viewAdminPage = async (req, res) => {
    if (!req.cookies?.admin?._id) return res.redirect("/");
    let loginAdmin = await Admin.findById(req.cookies.admin._id);
    let admins = await Admin.find();
    return res.render("view-admin", { admins, admin: loginAdmin });
};

exports.addNewAdmin = async (req, res) => {
    try {
        if (req.file) req.body.image = `/uploads/${req.file.filename}`;
        await Admin.create(req.body);
        return res.redirect("/admin/view-admin");
    } catch (err) {
        console.error(err);
        return res.redirect("/admin/view-admin");
    }
};

exports.editAdminPage = async (req, res) => {
    try {
        let admin = await Admin.findById(req.params.id);
        if (!admin) return res.redirect("/admin/view-admin");
        return res.render("edit-admin", { admin });
    } catch (err) {
        console.error(err);
        return res.redirect("/admin/view-admin");
    }
};

exports.updateAdmin = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);
        if (!admin) return res.redirect("/admin/view-admin");

        if (!req.body.password || req.body.password.trim() === "") {
            delete req.body.password; // Keep old password
        }

        if (req.file) {
            if (admin.image) {
                const imagePath = path.join(__dirname, "..", admin.image);
                if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
            }
            req.body.image = `/uploads/${req.file.filename}`;
        }

        await Admin.findByIdAndUpdate(admin._id, req.body, { new: true });

        return res.redirect("/admin/view-admin");
    } catch (err) {
        console.error(err);
        return res.redirect("/admin/view-admin");
    }
};

exports.deleteAdmin = async (req, res) => {
    try {
        let admin = await Admin.findById(req.params.id);
        if (!admin) return res.redirect("/admin/view-admin");

        if (admin.image) {
            const imagePath = path.join(__dirname, "..", admin.image);
            if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
        }

        await Admin.findByIdAndDelete(req.params.id);
        return res.redirect("/admin/view-admin");
    } catch (err) {
        console.error(err);
        return res.redirect("/admin/view-admin");
    }
};
