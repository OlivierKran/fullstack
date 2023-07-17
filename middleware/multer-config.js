const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'images/jpeg': 'jpg',
    'images/png': 'png'
};

const storage = multer.diskStorage({
    //indique à Multer où enregistrer les images
    destination: (req, file, callback) => {
        callback(null, 'images');
    },

    filename: (req, file, callback) =>{
        //utilise le nom d'origine du fichier, remplace les éventuels espaces par underscore et ajoute un timestamp
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.'+ extension);
    }
});

//single: crée un middleware qui capture les fichiers d'un certain type (passé en argument), et les enregistre au système de fichiers du serveur à l'aide du storage configuré.
module.exports = multer({storage: storage}).single('image');