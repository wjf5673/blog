import { motion } from "motion/react";
import { Github, Send, MessageCircle, Mail, Heart } from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export function Footer() {
  const { t } = useTranslation();
  
  // 处理复制联系方式的函数
  const handleCopyContact = async (contact: string, type: string) => {
    try {
      await navigator.clipboard.writeText(contact);
      toast.success(t('footer.toast.copySuccess', { type }));
    } catch (err) {
      toast.error(t('footer.toast.copyFailed', { type }));
    }
  };
  
  const socialLinks = [
    { 
      icon: Github, 
      contact: "https://github.com/wjf5673", 
      label: t('footer.socialLabels.github'),
      title: t('footer.socialLinks.github')
    },
    { 
      icon: Send, 
      contact: "18305975673", 
      label: t('footer.socialLabels.telegram'),
      title: t('footer.socialLinks.telegram')
    },
    { 
      icon: MessageCircle, 
      contact: "wujianfei7378", 
      label: t('footer.socialLabels.wechat'),
      title: t('footer.socialLinks.wechat')
    },
    { 
      icon: Mail, 
      contact: "985842837@qq.com", 
      label: t('footer.socialLabels.email'),
      title: t('footer.socialLinks.email')
    },
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
                  <motion.button
                    key={link.label}
                    onClick={() => handleCopyContact(link.contact, link.label)}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors cursor-pointer"
                    title={link.title}
                    aria-label={link.label}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.button>
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
