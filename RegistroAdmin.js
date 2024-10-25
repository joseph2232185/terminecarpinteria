import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyAa3ydRkiuR79uIRur4NZO3kkHcaq0EC3g",
    authDomain: "logincarpinteria.firebaseapp.com",
    projectId: "logincarpinteria",
    storageBucket: "logincarpinteria.appspot.com",
    messagingSenderId: "175583000054",
    appId: "1:175583000054:web:bb3ad7ee07cea6652dc3d7",
    measurementId: "G-BHHS9ZQ1G4"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage(app);

export { db, auth, storage };

document.getElementById("registro").addEventListener("click", async function() {
    var email = document.getElementById("email").value;
    var contraseña = document.getElementById("contraseña").value;
    var nombre = document.getElementById("nombre").value;

    if (nombre === "" || email === "" || contraseña === "") {
        alert("Todos los campos son obligatorios");
        return;
    }

    try {
        // Crear un nuevo usuario en Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, contraseña);
        const user = userCredential.user;

        // Guardar información adicional en Firestore
        await setDoc(doc(db, "Usuarios", user.uid), {
            nombre: nombre,
            email: email,
            contraseña: contraseña
        });

        alert("Usuario creado exitosamente");

        // Redirigir a index.html
        window.location.href = "Login.html";
    } catch (error) {
        console.log("Error al crear el usuario: ", error);
        alert("Hubo un error al registrar el usuario.");
    }

    // Limpiar los campos del formulario
    document.getElementById("email").value = "";
    document.getElementById("contraseña").value = "";
    document.getElementById("nombre").value = "";
});