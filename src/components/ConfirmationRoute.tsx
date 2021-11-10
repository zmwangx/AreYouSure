import React from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';

import { primaryColorPalette, RouteProps } from '@/utils';

export default function ConfirmationRoute({
  index,
  total,
  wide,
  children,
}: RouteProps & { wide?: boolean; children: React.ReactNode }) {
  const indices = [...Array(total).keys()];
  const last = index === total - 1;
  return (
    <motion.main
      className={classNames('flex-1 p-6', wide ? 'sm:max-w-lg' : 'sm:max-w-sm')}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Breadcrumbs */}
      <div className="flex items-center justify-center">
        {indices.map(i => (
          <svg
            key={i}
            className="h-2.5 w-2.5 text-gray-300"
            viewBox="0 0 128 128"
            style={{ fill: i < index ? primaryColorPalette[i] : 'currentcolor' }}
          >
            <path d="M0 0h64l36.95 64h-64zM36.95 64h64L64 128H0z" />
          </svg>
        ))}
      </div>

      <p
        className="mt-1 text-center text-2xl font-medium leading-loose select-none"
        style={{ color: primaryColorPalette[index] }}
      >
        {last ? 'Are you really sure?' : 'Are you sure?'}
      </p>
      {children}
    </motion.main>
  );
}
