import { DocumentBuilder } from '@nestjs/swagger';

export const config = new DocumentBuilder()
.setTitle('Service E-commerce historias de usuarios')
.setDescription('Pruebas de configuracion de api')
.setVersion('1.0')
.addTag('Rutas del servidor')
.build();

// Configuracion que debe utilizar swagger para su funcionalidad