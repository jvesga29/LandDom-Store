import React, { useState } from 'react';
import './register.css';
import { Link } from 'react-router-dom'

export default function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    async function registerUser(event) {
        event.preventDefault()

        const response = await fetch('http://localhost:8080/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                phone,
                password,
            }),
        })

        const data = await response.json()

        console.log(data)
    }

    return (
        <div className='register'>
            <h1 className='register__title'>Register</h1>
            <div className='register__form-container'>
                <h2>Crear Cuenta</h2>
                <form onSubmit={registerUser}>
                    <div className='register__box'>
                        <label htmlFor="name">Nombre</label>
                        <input
                            type="text" 
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            name='name' id='name'
                            placeholder='Ingresa Nombres y apellidos'
                        />
                    </div>
                    <div className='register__box'>
                        <label htmlFor='email'>Correo electrónico</label>
                        <input 
                            type="email" 
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            name='email' id='email'
                            placeholder='Ingresa correo electrónico'
                        />
                    </div>
                    <div className='register__box'>
                        <label htmlFor='phone'>Número de teléfono móvil</label>
                        <input 
                            type="number" 
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                            name='phone' id='phone'
                            placeholder='Ingresa numero de teléfono móvil'
                        />
                    </div>
                    <div className='register__box'>
                        <label htmlFor='password'>Contraseña</label>
                        <input 
                            type="password" 
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            name='password' id='password'
                        />
                        <p className='password__text'>La contraseña debe contener al menos 6 caracteres.</p>
                    </div>
                    <button className='register__btn' type='submit'>Registrarse</button>
                </form>
                <div className='register__terms'>
                    <p>Al crear una cuenta, aceptas los <a href="#">Condiciones de uso</a> y el <a href='#'>Aviso de privacidad</a> de LandDom</p>
                </div>
                <div className='register__session-forgot'>
                    <p>¿Ya tienes una cuenta? <Link to={'/login'} className='register__highlight' >Iniciar Sesión</Link></p>
                </div>
            </div>
        </div>
    )
}
