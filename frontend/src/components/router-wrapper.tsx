import { Outlet } from 'react-router-dom';
import Navigation from './navigation';

export function RouterWrapper() {
    return (
        <>
            <Navigation />
            <Outlet />
        </>
    )
}