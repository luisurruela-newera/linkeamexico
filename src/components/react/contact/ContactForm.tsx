// src/components/MiFormulario.tsx
import React, { type ChangeEvent, type FormEvent, useState } from "react";

interface FormProps {
  // Aquí puedes definir las props que este componente podría recibir
}

interface IFormState {
  name: string;
  phone: string;
  message: string;
}

function ContactForm({}: FormProps) {
  const [state, setState] = useState<IFormState>({
    name: "",
    phone: "",
    message: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget as HTMLFormElement);
      const endpoint = `${import.meta.env.BASE_URL}api/send-emails`;
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert("Mensaje enviado correctamente. ¡Gracias!");
        setState({ name: "", phone: "", message: "" });
      } else {
        alert(
          `Error al enviar el mensaje: ${data.error || "Inténtalo de nuevo."}`
        );
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      alert("Hubo un error al enviar el formulario. Inténtalo de nuevo.");
    }
  };

  return (
    <div>
      <form
        id="contactForm"
        className="px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        {" "}
        {/* Usamos onSubmit */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-white/50 text-sm font-bold mb-2"
          >
            Tu nombre:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="border text-sm border-gray-700 w-full py-2 px-3 text-white/70 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-white/50 text-sm font-bold mb-2"
          >
            Teléfono con Whatsapp:
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="border text-sm border-gray-700 w-full py-2 px-3 text-white/70 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="message"
            className="block text-white/50 text-sm font-bold mb-2"
          >
            Mensaje:
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className="border text-sm border-gray-700 w-full py-2 px-3 text-white/70 leading-tight focus:outline-none focus:shadow-outline"
            placeholder='Con un "Hola Luis, me interesan tus servicios" es suficiente. Te mandaré mensaje de vuelta.'
            onChange={handleTextAreaChange}
          ></textarea>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-800 text-white/95 font-bold cursor-pointer py-2 px-4 focus:outline-none focus:shadow-outline w-full md:w-auto"
          >
            Enviar Mensaje
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
