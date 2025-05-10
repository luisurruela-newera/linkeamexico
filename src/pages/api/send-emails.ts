// src/pages/api/send-email.ts
export const prerender = false;

import nodemailer from 'nodemailer';
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const message = formData.get('message') as string;

    // **Configuración del transportador de correo electrónico**
    // Reemplaza con la configuración de tu servicio de correo electrónico
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Ejemplo: 'Gmail', 'SendGrid', etc.
      auth: {
        user: 'luis.urruela@gmail.com', // Tu dirección de correo electrónico
        pass: 'vkzytzpwvmxymrpf', // Tu contraseña o contraseña de aplicación (si usas Gmail con 2FA)
      },
    });

    // **Opciones del correo electrónico**
    const mailOptions = {
      from: 'luis.urruela@gmail.com',
      to: 'luis.urruela@gmail.com', // La dirección a la que quieres recibir los mensajes
      subject: '[LINKEA ] Nuevo mensaje',
      text: `Nombre: ${name}\nTeléfono: ${phone}\nMensaje: ${message}`,
    };

    // **Envío del correo electrónico**
    const info = await transporter.sendMail(mailOptions);
    console.log('Mensaje enviado:', info.messageId);

    return new Response(
      JSON.stringify({ message: 'Mensaje enviado correctamente' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return new Response(
      JSON.stringify({ error: 'Hubo un error al enviar el mensaje' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};