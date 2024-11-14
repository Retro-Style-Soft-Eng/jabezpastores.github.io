import React from 'react';
import ReactDOM from 'react-dom';
import supabase from '/src/supabaseClient';

const Home = () => {
    console.log(supabase)

    return (
        <div className="page home">
            <h2>Home is where the heart is!</h2>
        </div>
    )
}

export default Home