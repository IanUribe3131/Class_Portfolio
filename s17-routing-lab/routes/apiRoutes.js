import express from 'express';
import { protect, requireAdmin } from '../middlewares/authMiddleware.js';
import { AppError } from '../utils/appError.js';

const router = express.Router();

// Simulated In-Memory Database
let initiatives = [
    { id: 1, title: 'Solar Canopy Expansion', priority: 'High', status: 'Active' },
    { id: 2, title: 'Campus Composting Loop', priority: 'Medium', status: 'In Review' }
];

// Use router.route('/') with METHOD CHAINING
// Chain .get() -> protected, returns all initiatives
// Chain .post() -> protected, validates body title & priority, creates & returns new initiative (201)
router.route('/')
    .get(protect, (req,res) => {
        res.json(initiatives);
    })
    .post(protect, (req,res, next) => {
        //get title and priority from the body inside the request
        const { title, priority } = req.body;
        //validate
        if (!title || !priority) {
            return next(new AppError('Title and priority are required',400));
        }
        //make the new id
        const id = initiatives.length + 1;
        //create the initiative
        const newInitiative = {
            id,
            title,
            priority,
            status: 'In Review'
        };
        //add the initiative to the array
        initiatives.push(newInitiative);
        //return the initiative
        res.status(201).json(newInitiative);
        
    });

// TODO: Use router.route('/:id') with METHOD CHAINING
// Chain .get() -> protected, returns single initiative or 404
// Chain .delete() -> protected + requireAdmin, deletes initiative by ID or 404
router.route('/:id')
    .get(protect, (req, res, next) => {
        //get the id from the request
        const id = Number(req.params.id);
        //search the initiative with the id
        const initiative = initiatives.find(item => item.id === id);
        //check if initiative exists
        if (!initiative) {
            return next(
                new AppError('Initiative not found', 404)
            );
        }
        //if it does exist return the initiative
        res.json(initiative);
    })
    .delete(protect, requireAdmin, (req, res, next) => {
        //get the initiative id
        const id = Number(req.params.id);
        //search for the initiative
        const index = initiatives.findIndex(item => item.id === id);
        //if initative not found
        if (index === -1) {
            return next(new AppError('Initiative not found', 404));
        }
        //remove the initiative
        initiatives.splice(index, 1);
        //return a confirmation message
        res.json({
            status: 'success',
            message: 'Initiative deleted successfully'
        });
    });

export default router;
