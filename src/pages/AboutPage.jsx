import { Award, Heart, Package, Users } from 'lucide-react';
import React from 'react'
import { motion } from "motion/react";

export default function AboutPage() {

    const values = [
        {
            icon: Award,
            title: 'Quality First',
            description: 'We source only the finest materials to ensure every piece meets our high standards.',
        },
        {
            icon: Package,
            title: 'Fast Shipping',
            description: 'Free shipping on all orders with tracking and insurance included.',
        },
        {
            icon: Heart,
            title: 'Customer Love',
            description: 'Our customers are at the heart of everything we do. Your satisfaction is our priority.',
        },
        {
            icon: Users,
            title: 'Community',
            description: 'Join thousands of fashion enthusiasts who trust us for their wardrobe essentials.',
        },
    ];

    return (
        <div className='min-h-screen bg-white dark:bg-neutral-950'>
            {/* hero */}
            <section className='py-20 bg-neutral-50 dark:bg-neutral-900'>
                <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <h1 className='text-5xl font-bold text-neutral-900 dark:text-white mb-6'>
                            About FASHION
                        </h1>
                        <p className='text-xl text-neutral-600 dark:text-neutral-400'>
                            We believe fashion should be assessible, sustainable, and timeless. Our mission is to create Premium clothing that empowers individuals to express their unique style.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Story */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
                                Our Story
                            </h2>
                            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                                Founded in 2020, FASHION started with a simple idea: create clothing that combines timeless
                                design with modern functionality. What began as a small collection has grown into a global
                                brand loved by fashion enthusiasts worldwide.
                            </p>
                            <p className="text-neutral-600 dark:text-neutral-400">
                                Every piece we create is thoughtfully designed, ethically made, and built to last. We're
                                committed to reducing our environmental impact while delivering exceptional quality.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="aspect-square rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-800"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1507297448044-a99b358cd06e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                                alt="Our Story"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>
            {/* Values */}
            <section className=' py-20 bg-neutral-50 dark:bg-neutral-900'>
                <div className='max-w-7xl mx-auto px-3 sm:px-6 lg:px-8'>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className='text-center mb-16'>
                        <h2 className='text-3xl font-bold text-neutral-900 dark:text-white mb-4'>
                            Our Values
                        </h2>
                        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                            These principles guide everything we do
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neutral-900 dark:bg-white flex items-center justify-center">
                                    <value.icon className="w-8 h-8 text-white dark:text-neutral-900" />
                                </div>
                                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
                                    {value.title}
                                </h3>
                                <p className="text-neutral-600 dark:text-neutral-400">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
