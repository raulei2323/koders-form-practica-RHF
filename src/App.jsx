import { useState } from 'react';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';

export default function App() {
  const [dataInfo, setDataInfo] = useState([])

  const {
    register, 
    handleSubmit,
    reset,
    formState: {isValid, isSubmitted, errors}
  } = useForm(); 

  function onSubmit(data){
    setDataInfo([... dataInfo, data]);
    reset()
  }

  function removeReg(idxRemove){
    const newDataInfo = dataInfo.filter((reg, idx)=> idx != idxRemove);
    setDataInfo(newDataInfo)
  }
  return (
    <main className='w-full min-h-screen'>
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
        {dataInfo.length === 0 && (
          <p className="text-white/50"> No hay registros</p>
        )}
        {
          dataInfo.length > 0 &&
          dataInfo.map((koder, idx)=>{
            return(
              <div
              key={idx}
              className="bg-white/10 rounded p-4 flex flex-row justify-between ">
                <span className="select-none">
                  {koder.firstName}{koder.lastName} - {koder.email}
                </span>
                <span className="text-red-500 cursor-pointer hover:bg-red-500 hover:text-white rounded-full p-0 size-5 text-center items-center text-sm" 
                  onClick={()=> removeReg(idx)}>X</span>
              </div>
            )
          })
        }

      </div>
    </main>
  );
}
