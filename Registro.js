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
    var email = document.getElementById("email").value.trim();
    var contraseña = document.getElementById("contraseña").value;
    var nombre = document.getElementById("nombre").value.trim();

    // Validar campos obligatorios
    if (nombre === "" || email === "" || contraseña === "") {
        alert("Todos los campos son obligatorios");
        return;
    }

    // Validar formato del correo electrónico
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    if (!isValidEmail(email)) {
        alert("Por favor, ingresa un correo electrónico válido.");
        return;
    }

    // Validar longitud de la contraseña
    if (contraseña.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres.");
        return;
    }

    try {
        // Crear un nuevo usuario en Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, contraseña);
        const user = userCredential.user;

        // Guardar información adicional en Firestore
        await setDoc(doc(db, "Usuarios", user.uid), {
            nombre: nombre,
            email: email
                // No almacenar la contraseña
        });

        alert("Usuario creado exitosamente");
        window.location.href = "Login.html";
    } catch (error) {
        console.log("Error al crear el usuario: ", error);
        if (error.code === 'auth/email-already-in-use') {
            alert("El correo ya está en uso. Intenta con otro.");
        } else {
            alert("Hubo un error al registrar el usuario: " + error.message);
        }
    }

    // Limpiar los campos del formulario
    document.getElementById("email").value = "";
    document.getElementById("contraseña").value = "";
    document.getElementById("nombre").value = "";
});