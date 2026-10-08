import { AppError } from '../utils/appError.js';


export const protect = (req, res, next) => {
    // WRITE YOUR PROTECTION LOGIC HERE
    //  Implement 'protect' middleware
    // 1. Extract 'authorization' header from req.headers
    const authHeader = req.headers.authorization;
    // 2. Check if header exists and starts with 'Bearer '
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new AppError('Unauthorized: Invalid or missing token', 401));
    }
    // 3. Extract token string
    const token = authHeader.substring(7);
    // 4. Validate token:
    //    - If token === 'sustain-user-token', attach req.user = { id: 101, name: 'Elena', role: 'user' }
    if (token === 'sustain-user-token') {
        req.user = {
            id: 101,
            name: 'Elena',
            role: 'user'
        };
    }
    //    - If token === 'sustain-admin-token', attach req.user = { id: 999, name: 'Prof. Gabriel', role: 'admin' }
    else if (token === 'sustain-admin-token') {
        req.user = {
            id: 999,
            name: 'Prof. Gabriel',
            role: 'admin'
        };
}
//    - Otherwise, pass next(new AppError('Unauthorized: Invalid or missing token', 401))
else {
    return next(new AppError('Unauthorized: Invalid or missing token', 401));
}
    next();
};


export const requireAdmin = (req, res, next) => {
    // WRITE YOUR ADMIN CHECK LOGIC HERE
    //  Implement 'requireAdmin' middleware
    // 1. Verify if req.user exists and req.user.role === 'admin'
    if (req.user && req.user.role === 'admin') {
        // 2. If true, call next()
        return next();
    }

    // 3. Otherwise, pass next(new AppError('Forbidden: Admin privilege required for this action', 403))
    return next(
        new AppError(
            'Forbidden: Admin privilege required for this action',
            403
        )
    );
};
