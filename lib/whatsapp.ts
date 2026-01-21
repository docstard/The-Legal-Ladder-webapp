/**
 * WhatsApp Integration Utility
 * Generates WhatsApp links with pre-filled messages
 */

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210';

/**
 * Generate WhatsApp link for course inquiry
 */
export function getWhatsAppLink(params: {
  courseName: string;
  courseId?: string;
  price?: number;
  userName?: string;
}): string {
  const { courseName, courseId, price, userName } = params;
  
  let message = `Hi! I'm interested in the *${courseName}* course.`;
  
  if (userName) {
    message = `Hi! I'm ${userName}. I'm interested in the *${courseName}* course.`;
  }
  
  if (price) {
    message += `\n\nCourse Price: ₹${price}`;
  }
  
  message += '\n\nCould you please provide more details?';
  
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

/**
 * Generate WhatsApp link for general inquiry
 */
export function getGeneralWhatsAppLink(message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

/**
 * Generate WhatsApp link for counseling session inquiry
 */
export function getCounselingWhatsAppLink(userName?: string): string {
  let message = 'Hi! I would like to book a 1-on-1 counseling session.';
  
  if (userName) {
    message = `Hi! I'm ${userName}. I would like to book a 1-on-1 counseling session.`;
  }
  
  message += '\n\nPlease let me know the available slots and pricing.';
  
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}
