# Usa una imagen de Node.js
FROM node:18-alpine

# Crea directorio de trabajo
WORKDIR /app

# Copia package files
COPY package.json package-lock.json ./

# Instala dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto
EXPOSE 3005

# Comando para iniciar la app
CMD ["node", "pregunta3.js"]
