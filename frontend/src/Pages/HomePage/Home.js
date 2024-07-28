
import { useContext } from 'react';
import Header from '../../Component/Header/Header';
import { User } from '../Context/UserContext';

export default function Home(){
	const userNow = useContext(User);
	console.log(userNow);
    return <div> 
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <Header/>
        Home
        </div>
}