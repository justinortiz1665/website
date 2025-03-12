
"use client"

"use client"

import { Fragment } from 'react'
import Link from 'next/link'
import { Dialog, Transition } from '@headlessui/react'
import { ExternalLink } from './external-link'

interface MobileNavProps {
  items: {
    href: string
    label: string
    isExternal?: boolean
  }[]
  open: boolean
  onClose: () => void
}

export function MobileNav({ items, open, onClose }: MobileNavProps) {
  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-gray-900">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Menu
                </Dialog.Title>
                <div className="mt-4 flex flex-col space-y-4">
                  {items.map((item, index) => {
                    if (item.isExternal) {
                      return (
                        <ExternalLink
                          key={index}
                          href={item.href}
                          className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                          onClick={onClose}
                        >
                          {item.label}
                        </ExternalLink>
                      )
                    }

                    return (
                      <Link
                        key={index}
                        href={item.href}
                        className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                        onClick={onClose}
                      >
                        {item.label}
                      </Link>
                    )
                  })}
                </div>
                <div className="mt-6">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
