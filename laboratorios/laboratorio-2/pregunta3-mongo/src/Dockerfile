FROM node:20-alpine

# Establece directorio de trabajo
WORKDIR /app

# Copia archivos de dependencias
COPY package*.json ./

# Instala dependencias
RUN npm install --quiet

# Copia todos los archivos
COPY . .

# Expone puerto
EXPOSE 3005

# Comando de inicio
CMD ["node", "app.js"]