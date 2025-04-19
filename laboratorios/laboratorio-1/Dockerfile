# Usa la imagen base de Node.js 18alpine
FROM node:18-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos del proyecto
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Expone el puerto en el que corre tu app (cambia si es otro puerto)
EXPOSE 3000

# Comando para iniciar la app (ajusta si usas otro comando)
CMD ["node", "pregunta3.js"]