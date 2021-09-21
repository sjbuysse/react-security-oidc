# Custom hooks

You saw how to use existing hooks such as `useState` and `useEffect`. You can also write your own hooks to extract
logic, and to be able to re-use it.

For example, imagine you want to extract some toggle functionality.

```tsx
const useToggle = (initialState = false) => {
    // your hook can call other hooks! but follow the rules of hooks.
    const [state, setState] = useState(initialState);

    const toggle = () => setState(state => !state);

    return [state, toggle]
}
```

We can now use this anywhere in our app.

```tsx
function App() {
    // Call the hook which returns, current value and the toggler function
    const [isTextChanged, setIsTextChanged] = useToggle();

    return (
        <button onClick={setIsTextChanged}>{isTextChanged ? 'Toggled' : 'Click to Toggle'}</button>
    );
}
```

for more useful and useless examples check [usehooks](www.usehooks.com)

# Toaster

In this chapter we will learn how to share the state throughout the app. Let's say we want to create `Toaster` feature,
so that we can trigger error & success messages from anywhere in the app. To do this, we will use React's `Context` API.

## Context API

React provides an API that we can use to share variables in a certain part of the application, without having to pass
the prop through many components. This is called the `Context` API. When we create a `Context`, it can hold variables &
functions to update those variables, and we can access these from anywhere in the application. IMPORTANT disclaimer:
this is a feature that you do not want to over-use! You only want to use this for truly global information, that you
need in many parts of the application, such as authentication, or a theme, or a language, ...

When we call the `createContext()` function from the React library that creates a context in which you can put the
variables you'd like to share. This function returns an object that contains a `Provider` component.

2. Provider: All children (nested components) of this `Provider` component will have direct access to the variables in
   the context.

```tsx
//ExampleContext.tsx
const user = {name: 'Simon', uid: '1234'}
export const ExampleContext = React.createContext();
//wrap your app in a Provider for the ExampleContext
<ExampleContext.Provider value={user}><App/></ExampleContext.Provider>
// Anywere nested under the App component you can access the context with the `useContext` hook
// Let's say you will render the WelcomeComponent somewhere in your App.
const WelcomeComponent = () => {
    const user = useContext(ExampleContext)
    return <h1>Helllo {user.name}</h1>
}
```

You still have to make sure that the `WelcomeComponent` is part of the application that is nested inside the `Provider`
component. Usually you just wrap the `Provider` component around the `App` component, this way you share data throughout
the application.

Ps. it's important to realize that the `Context` API is not a state management solution. It re-renders all subscribers
whenever any value changes, that's why you should only use it for semi-static data. Read more about
this [on this blogpost ](https://blog.isquaredsoftware.com/2021/01/context-redux-differences/#purpose-and-use-cases-for-context)
by a Redux maintainer.

## AuthContext

Now let's pull out that `UserManager` logic from the `App` component, and create a `Context` and `Provider` to hold this
logic.

Create a file `src/toaster/ToasterContext.tsx`, and copy in the code below. As you can see, we create a
wrapper (`ToasterProvider`) around the `Provider` component from the `Context`. Here we will write all the logic that we
want to share, basically we keep a state for the errors and notifications, and we render those out. We also pass
the `setError` and `setNotification` functions to the `Provider`, because that is the data that we want to access
directly in the whole application.

The last thing you might notice is that we render the `children` prop inside the `Provider`.
Read [this](https://reactjs.org/docs/jsx-in-depth.html#children-in-jsx) if you don't know what this `children` prop is.
The short explanation is than when we wrap our `ToastProvider` component around another component (for example `App`),
then this nested component (`App`) will be passed in the `children` prop automatically. This is default `React`
behaviour. This is in my opinion one of the greatest React features and allows you to write very composable components.

```tsx
import React, {createContext, useEffect, useState} from "react";
import {DialogContent} from "@reach/dialog";

interface IToasterContext {
    setError: (error: string) => void;
    setNotification: (notification: string) => void;
}

export const ToasterContext = createContext<IToasterContext>({
   setError: error => {},
   setNotification: notification => {}
});

const {Provider} = ToasterContext;

export const ToasterProvider = ({children}: { children: React.ReactNode }) => {
    const [error, setError] = useState<string | null>(null);
    const [notification, setNotification] = useState<string | null>(null);

    useEffect(() => {
        if (!!error) {
            setTimeout(() => setError(null), 5000)
        }
    }, [error]);

    useEffect(() => {
        if (!!notification) {
            setTimeout(() => setNotification(null), 5000)
        }
    }, [notification]);
    return (
        <Provider
            value={{
                setError, setNotification
            }}
        >
            {children}
            {error && <DialogContent aria-label='error toast'
                                     style={{margin: 'auto', padding: 0, backgroundColor: 'var(--red-700)'}}
                                     className='rounded-md m-auto vw-90-on-phone absolute right-4 top-20 flex flex-wrap'>
                <div className='flex justify-center w-full p-3 text-gray-200'>
                    {error}
                </div>
            </DialogContent>}
            {notification && <DialogContent aria-label='success toast'
                                            style={{margin: 'auto', padding: 0, backgroundColor: 'forestgreen'}}
                                            className='rounded-md m-auto vw-90-on-phone absolute right-4 top-20 flex flex-wrap'>
                <div className='flex justify-center w-full p-3 text-gray-200'>
                    {notification}
                </div>
            </DialogContent>}
        </Provider>
    );
};
```

If we now wrap `ToastProvider` around the `App` component, then we can access to the `ToastContext` in any component
inside our application.

```tsx
ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <ToastProvider>
                <App/>
            </ToastProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);
```

## use our ToastContext

In our `ClientsTable` component, we can now for example wrap the `await getClients` with a try/catch
block. In the catch we could call the `setError` method that is shared through the `ToasterContext`

In order to access this method we call the `useContext` function in the `ClientsTable` component
```tsx
import {useContext} from 'react';
//...
const {setError} = useContext(ToasterContext)
```

## Bonus

Now that you understand the basic `Context` use, I'm going to give you a pro tip. We're going to create a custom hook
that returns the `ToasterContext`. So instead of doing

```tsx
import {ToasterContext} from "./ToasterContext";

const context = React.useContext(ToasterContext)
```

We'll be doing

```tsx
import {useToaster} from "./ToasterContext";

const context = useToaster();
```

You'll see in a second why this is cool.

In the `ToasterContext.tsx` file create the following custom hook, and export that in stead of the `ToasterContext`
Remember, a custom hook can call other hooks, so we can get our context with the `useContext` hook and return it.
```tsx
export function useToaster() {
   const context = React.useContext(ToasterContext);
   if (context === undefined) {
      throw new Error("useToaster must be used within a ToasterContext");
   }
   return context;
}
```

There are 2 advantages to creating this super simple custom hook.
First of all, we will get immediately an error if we are trying to access the `ToasterContext`
from a place that is not wrapped by the `ToasterProvider`.
Second of all we can now initialize our `ToasterContext` with `undefined` instead of this useless weird empty `ToasterContext` object. so replace:

```tsx
export const ToasterContext = createContext<IToasterContext>({
   setError: error => {},
   setNotification: notification => {}
});
```

with

```tsx
export const ToasterContext = createContext<IToasterContext | undefined>(undefined);
```
Before, we initialized it with this weird object, so that we wouldn't have to null-check the context
everywhere we used it in the application. But with this new `useToaster` hook, the null-check only 
needs to happen once. 

Okay, refactor now your app (basically just replace the `useContext(ToasterContext)` with `useToaster()`), or go to the next
branch.
