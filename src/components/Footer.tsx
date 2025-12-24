import { motion } from "motion/react";
import { Github, Twitter, Linkedin, Mail, Heart } from "lucide-react";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();
  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Mail, href: "#", label: "Email" },
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl mb-4">{t('footer.brand.title')}</h3>
            <p className="text-gray-400">
              {t('footer.brand.description')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-xl mb-4">{t('footer.quickLinks.title')}</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#home" className="hover:text-white transition-colors">{t('footer.quickLinks.home')}</a></li>
              <li><a href="#news" className="hover:text-white transition-colors">{t('footer.quickLinks.news')}</a></li>
              <li><a href="#tech" className="hover:text-white transition-colors">{t('footer.quickLinks.tech')}</a></li>
              <li><a href="#messages" className="hover:text-white transition-colors">{t('footer.quickLinks.messages')}</a></li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl mb-4">{t('footer.followUs.title')}</h3>
            <div className="flex gap-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors"
                    aria-label={link.label}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border-t border-gray-800 pt-8 text-center text-gray-400"
        >
          <p className="flex items-center justify-center gap-2">
            {t('footer.copyright.madeWith')} <Heart className="w-4 h-4 text-red-500 fill-red-500" /> {t('footer.copyright.by')}
          </p>
          <p className="mt-2">{t('footer.copyright.rights')}</p>
        </motion.div>
      </div>
    </footer>
  );
}
