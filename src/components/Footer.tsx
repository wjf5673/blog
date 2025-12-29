import { motion } from "motion/react";
import { Github, Send, MessageCircle, Mail, Heart } from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import miniProgramQrCode from "../assets/images/mini-program-qrcode.jpg";

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

  // 处理二维码点击放大预览
  const handleQrCodeClick = () => {
    // 创建一个模态框显示放大的二维码
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4';
    modal.onclick = () => document.body.removeChild(modal);
    
    const qrContainer = document.createElement('div');
    qrContainer.className = 'bg-white p-4 rounded-lg max-w-sm w-full';
    
    const qrImage = document.createElement('img');
    qrImage.src = miniProgram.qrCode;
    qrImage.alt = '小程序二维码';
    qrImage.className = 'w-full h-auto';
    
    const closeButton = document.createElement('button');
    closeButton.className = 'mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition-colors cursor-pointer';
    closeButton.textContent = t('footer.miniProgram.closeModal');
    closeButton.onclick = () => document.body.removeChild(modal);
    
    const title = document.createElement('h3');
    title.className = 'text-center text-lg font-medium mb-2 text-gray-800';
    title.textContent = t('footer.miniProgram.scanTitle');
    
    qrContainer.appendChild(title);
    qrContainer.appendChild(qrImage);
    qrContainer.appendChild(closeButton);
    modal.appendChild(qrContainer);
    document.body.appendChild(modal);
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

  const miniProgram = {
    name: t('footer.miniProgram.name'),
    description: t('footer.miniProgram.description'),
    qrCode: miniProgramQrCode,
    features: [
      t('footer.miniProgram.features.feature1'),
      t('footer.miniProgram.features.feature2'),
      t('footer.miniProgram.features.feature3'),
      t('footer.miniProgram.features.feature4')
    ]
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-xl mb-4">{t('footer.miniProgram.title')}</h3>
            <motion.div 
              className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors relative overflow-hidden"
              whileHover={{ 
                y: -5,
                boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
                transition: { duration: 0.3 }
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex flex-col items-center">
                <motion.div 
                  className="w-24 h-24 bg-white rounded-lg mb-3 flex items-center justify-center cursor-pointer relative"
                  whileHover={{ 
                    scale: 1.1,
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.5 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleQrCodeClick}
                >
                  <motion.img 
                    src={miniProgram.qrCode} 
                    className="w-20 h-20 rounded"
                    alt="小程序二维码"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 rounded-lg flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="text-white text-xs font-medium">点击放大</span>
                  </motion.div>
                </motion.div>
                
                <motion.ul 
                  className="text-gray-400 text-xs space-y-1 w-full"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.9 }}
                >
                  {miniProgram.features.map((feature, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-center justify-center gap-1"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.3, 
                        delay: 1.0 + index * 0.1 
                      }}
                      whileHover={{ 
                        x: 5,
                        color: "#ffffff",
                        transition: { duration: 0.2 }
                      }}
                    >
                      <motion.span 
                        className="w-1 h-1 bg-indigo-500 rounded-full flex-shrink-0"
                        whileHover={{ 
                          scale: 1.5,
                          backgroundColor: "#818cf8"
                        }}
                      />
                      <span className="text-center">{feature}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
              
              {/* 添加闪光效果 */}
              <motion.div
                className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
                whileHover={{ 
                  opacity: 0.1,
                  x: ["0%", "200%"],
                  transition: { duration: 0.6, ease: "easeInOut" }
                }}
                style={{ transform: "translateX(-100%)" }}
              />
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
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
