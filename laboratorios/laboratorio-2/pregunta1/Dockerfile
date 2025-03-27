# Usa una imagen oficial de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos necesarios
COPY ../package.json ./

# Instala dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto (ajústalo si usas otro)
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "pregunta1.js"]
