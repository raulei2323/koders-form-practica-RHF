import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';
import { getKoders, createKoder, deleteKoder } from './api'
import { Toaster, toast } from 'sonner';


export default function App() {
  const [koders, setKoders] = useState([])
  
  //?recibe 2 parametros
  //? 1. Una funcion / ca;;back
  //? 2/ Un arreglo de dependencias
  //? useEffect se usa para ejecutar codigo en partes especificas del ciclo de vida de un componente

  //?useEffect se ejecuta en 2 momentos
  //?1 cuando el componente se renderiza por primera vez
  //?2 cuando alguna de sus dependencias cambia
  useEffect(() => {
    console.log("Hola desde useEffect")
    getKoders()
    .then((koders) =>  {
      console.log("koders", koders)
    })
    .catch((error) => {
      console.error("Error al obtener koders", error)
      alert("Error al obtener koders")
    })
  }, [])

  function onDelete(koderId) {
    toast.success("Koder eliminado")
    deleteKoder(koderId)
    .then(() => {
      getKoders()
      .then((koders) => {
        setKoders(koders)
      }) 
    })
    .catch((error) => {
      console.error("Error al eliminar koder", error)
      alert("Error al eliminar koder")
    })

  }



  const {
    register, 
    handleSubmit,
    reset,
    setFocus,
    formState: {isValid, isSubmitted, errors}
  } = useForm(); 

  async function onSubmit(data){
    try {
      await createKoder({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email
      })
  
      const kodersList = await getKoders()
      setKoders(kodersList)
      setFocus("firstName")
      reset()
      toast.success("Koder creado")
    } catch (error) {
      console.error("Error al crear koder", error)
      alert("Error al crear koder")
    }
  }

  // function removeReg(idxRemove){
  //   const newDataInfo = koders.filter((reg, idx)=> idx != idxRemove);
  //   setKoders(newDataInfo)
  // } //Comentario punto de control...


  return (

    <main className='w-full min-h-screen'>
      <Toaster  richColors position='top-right' />
      <p className='grid  text-white'>Formulario Koders</p>
      <form className='grid grid-rows-3 p-1 gap-5'
      onSubmit={handleSubmit(onSubmit)}
      >
        <input
          {...register('firstName', {
            required: { value: true, message: 'Nombre requerido' },
            minLength: { value: 3, message: '3 caracteres minimo' },
            maxLength: { value: 180, message: 'Maximo 180 caracteres' }
          })}
          className={clsx('w-full max-w-screen-sm bg-sky-500 text-black placeholder-gray-700 rounded-md',{
            'bg-red-500 text-white':errors.firstName
          })}
          type='text'
          placeholder='Nombre'
          required
        />

        <input
        {...register("lastName", {
          required: { value: true, message: "Apellido requerido"},
          minLength: { value: 3, message: "3 caracteres minimo"},
          maxLength: { value: 180, message: "Maximo 180 caracteres"},
        })}
          className={clsx('w-full max-w-screen-sm bg-sky-500 text-black placeholder-gray-700 rounded-md', {
            'bg-red-500 text-white':errors.lastName
          })}
          type='text'
          placeholder='Apellido'
        />

        <input
        {...register("email", {
          required: { value: true, message: "Email requerido"},
          pattern: { value: /^\S+@\S+$/i, message: "Email inválido" },
        })}
          className={clsx('w-full max-w-screen-sm bg-sky-500 text-black placeholder-gray-700 rounded-md', {
            'bg-red-500 text-white':errors.email
          })}
          type='text'
          placeholder='Email'
        />
        <button 
        className="w-full max-w-screen-sm bg-white text-black px-3 rounded cursor-pointer disabled:bg-gray-400 disabled:cursor-default"
        disabled={isSubmitted ? !isValid : false}>
          Agregar Koder
        </button>
      </form>

      {errors.firstName && (
        <p 
            className="text-red-500 text-center text-sm font-semibold">
            {errors.firstName ?.message}</p> 
      )}
      {errors.lastName && (
        <p 
            className="text-red-500 text-center text-sm font-semibold">
            {errors.lastName ?.message}</p> 
      )}
      {errors.email && (
        <p 
            className="text-red-500 text-center text-sm font-semibold">
            {errors.email ?.message}</p> 
      )}

<div 
      className="mt-7 font-sans max-w-screen-sm w-full mx-auto flex flex-col justify-center gap-1">
        {koders.length === 0 && (
          <p className="text-white/50"> Aun no hay ningun Koder agregado</p>
        )}
        {
          koders.length > 0 &&
          koders.map((koder, idx)=>{
            return(
              <div
              key={idx}
              className="bg-white/10 rounded p-4 flex flex-row justify-between ">
                <span className="select-none">
                  {koder.firstName}{koder.lastName} - {koder.email}
                </span>
                <span className="text-red-500 cursor-pointer hover:bg-red-500 hover:text-white rounded-full p-0 size-5 text-center items-center text-sm" 
                  onClick={()=> onDelete(koder.id)}
                  >X</span>
              </div>
            )
          })
        }

      </div>
    </main>
  );
}
