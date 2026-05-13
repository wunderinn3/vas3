import React from 'react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-28 bg-transparent relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <footer className="text-center text-neutral-600 text-xs">
           &copy; {new Date().getFullYear()} Wunder Digital Agency
        </footer>
      </div>
    </section>
  );
};

export default Contact;
