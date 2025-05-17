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

  const [response, setResponse] = useState<string>("");
  const [buttonTitle, setButtonTitle] = useState<string>("Enviar mensaje");
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    validateForm() ? setButtonDisabled(false) : setButtonDisabled(true);
  };

  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    validateForm() ? setButtonDisabled(false) : setButtonDisabled(true);
  };

  const validateForm = () => {
    return (
      state.name.trim() !== "" &&
      state.phone.trim() !== "" &&
      state.message.trim() !== ""
    );
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setButtonTitle("Enviando...");
    setButtonDisabled(true);

    try {
      const formData = new FormData(event.currentTarget as HTMLFormElement);
      const endpoint = `${import.meta.env.BASE_URL}api/send-emails`;
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        showSuccessMessage();
      } else {
        showErrorMessage();
      }
    } catch (error) {
      showErrorMessage();
    }
  };

  const showSuccessMessage = () => {
    resetForm();
    setButtonDisabled(false);
    setButtonTitle("Enviar Mensaje");
    setResponse("Mensaje enviado correctamente. ¡Gracias!");

    setTimeout(() => {
      setResponse("");
    }, 9000);
  };

  const showErrorMessage = () => {
    resetForm();
    setButtonDisabled(false);
    setButtonTitle("Enviar Mensaje");
    setResponse("Hubo un error al enviar el mensaje. Inténtalo de nuevo.");

    setTimeout(() => {
      setResponse("");
    }, 9000);
  };

  const resetForm = () => {
    setState({ name: "", phone: "", message: "" });
  };

  return (
    <div>
      <form
        id="contactForm"
        className="px-4 pt-6 pb-8 mb-4"
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
            value={state.name}
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
            value={state.phone}
            required
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
            value={state.message}
            className="border text-sm border-gray-700 w-full py-2 px-3 text-white/70 leading-tight focus:outline-none focus:shadow-outline"
            placeholder='Con un "Hola Luis, me interesan tus servicios" es suficiente. Te mandaré mensaje de vuelta.'
            onChange={handleTextAreaChange}
          ></textarea>
        </div>
        <div className="flex items-center justify-center md:justify-start gap-3">
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-800 text-white/95 font-bold cursor-pointer py-2 px-4 focus:outline-none focus:shadow-outline w-full md:w-auto disabled:opacity-50 disabled:cursor-default hover:disabled:bg-purple-600"
            disabled={buttonDisabled}
          >
            {buttonTitle}
          </button>
          <p className="text-white/90 text-center md:text-start text-sm">
            {response}
          </p>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
