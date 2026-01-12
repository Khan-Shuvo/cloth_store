import { Facebook, Instagram, Mail, Twitter } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {

  const currentYear = new Date().getFullYear()
  return (
    <footer className='bg-neutral-900 dark:bg-black text-neutral-300 mt-auto'>
      <div className='max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8 py-12' >
        <div className='grid grid-cols-1 sm:grid-cols-4 gap-8'>
          {/* brand */}
          <div className='col-span-1'>
            <h2 className='text-2xl font-bold text-white mb-4 uppercase'>fashion</h2>
            <p className='text-sm text-neutral-400'>
              Premium quality clothing for the modern wordrobe. Timeless style meets contemporary desing.
            </p>
          </div>
          {/* shop */}
          <div>
            <h3 className='text-white font-semibold mb-4'>Shop</h3>
            <ul className='space-y-2'>
              <li>
                <Link to={'/shop?category=women'} className='text-sm hover:text-white transition-colors'>
                  Women
                </Link>
              </li>
              <li>
                <Link to={'/shop?category=men'} className='text-sm hover:text-white transition-colors'>
                  Men
                </Link>
              </li>
              <li>
                <Link to={'/shop?category=kids'} className='text-sm hover:text-white transition-colors'>
                  Kids
                </Link>
              </li>
              <li>
                <Link to={'/shop'} className='text-sm hover:text-white transition-colors'>
                  All Products
                </Link>
              </li>
            </ul>
          </div>
          {/* company */}
          <div>
            <h3 className='text-white font-semibold mb-4'>Company</h3>
            <ul className='space-y-2'>
              <li>
                <Link to={'/about'} className='text-sm hover:text-white transition-colors'>About Us</Link>
              </li>
              <li>
                <Link to={'/contact'} className='text-sm hover:text-white transition-colors'>Contact Us</Link>
              </li>
              <li>
                <a href='#' className='text-sm hover:text-white transition-colors'>Careers</a>
              </li>
              <li>
                <a href='#' className='text-sm hover:text-white transition-colors'>Press</a>
              </li>
            </ul>
          </div>
          {/* Connect */}
          <div>
            <h3 className='text-white font-semibold mb-4'>Connect</h3>
            <div className="flex space-x-4 mb-4">
              <a
                href="#"
                className="w-10 h-10 bg-neutral-800 hover:bg-neutral-700 rounded-full flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-neutral-800 hover:bg-neutral-700 rounded-full flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-neutral-800 hover:bg-neutral-700 rounded-full flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
            <p className='flex items-center text-sm text-neutral-400'>
              <Mail className='w-4 h-4 inline mr-2'/>
              hello@fashio.com
            </p>
          </div>
        </div>
        <div className='border-t border-neutral-800 mt-8 pt-8 text-center text-sm text-neutral-400'>
          <p>&copy; {currentYear} FASHION. All rights reserved.</p>
        </div>
      </div>

    </footer>

  )
}
