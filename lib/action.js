'use server';

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import {registerUser,loginUser} from './auth';
import { revalidatePath } from "next/cache";



function isInvalidText(text){
    return !text || text.trim() === '';
}

export async function signUp(formData){
    const newUser = {
        username: formData.get("username"),
        email:formData.get("email"),
        password: formData.get("password")
      };
      const userId = registerUser(newUser);
}

export async function shareMeal(formData){
  console.log(formData,'formData1')
    const meal = {
      title: formData.get('title'),
      summary: formData.get('summary'),
      instructions: formData.get('instructions'),
      image: formData.get('image'),
      creator: formData.get('name'),
      creator_email: formData.get('email')
    }

    if(
        isInvalidText(meal.title)||
        isInvalidText(meal.summary)||
        isInvalidText(meal.instructions)||
        isInvalidText(meal.creator)||
        isInvalidText(meal.creator_email)||
        !meal.creator_email.includes('@')||
        !meal.image || meal.image.size === 0
    ){
        throw new Error('Invalid Input')
    }
    await saveMeal(meal);
    revalidatePath('/meals','layout')  // to reduce aggressive cacshing
    redirect('/')
}

 
export async function authenticate(state,formData) {
  try {
    console.log(formData)
    const user = {
      email: formData.get('email'),
      password: formData.get('password'),
    }
    await loginUser('credentials', user)
  } catch (error) {
    if (error) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.'
        default:
          return 'Something went wrong.'
      }
    }
    throw error
  }
}
export async function register(formData) {
  console.log(formData,'formData')
    try {
      const user = {
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
      }
      await registerUser(user)
        return {
          message:'Registration Successful'
        }
    } catch (error) {
      if (error) {
        switch (error.type) {
          case 'CredentialsSignUp':
            return {message:'Invalid credentials.'}
          default:
            return {message:'Something went wrong.'}
        }
      }
      return {message:'Something went wrong.'}
    }
  }