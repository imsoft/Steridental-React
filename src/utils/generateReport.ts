import jsPDF from "jspdf";
import { formatDate } from ".";

interface Props {
  id: string;
  reportNumber: string;
  date: string;
  teamNumber: string;
  resultVial1: string;
  resultVial2: string;
  resultVial3: string;
  comments: string;
  userName: string;
  userLastName: string;
  userId: string;
  sterilizerBrand: string;
  sterilizerModel: string;
  sterilizerSerialNumber: string;
  sterilizerSterilizerType: string;
}

export const generateReport = ({
  id,
  reportNumber,
  date,
  resultVial1,
  resultVial2,
  resultVial3,
  comments,
  userName,
  userLastName,
  userId,
  sterilizerBrand,
  sterilizerModel,
  sterilizerSerialNumber,
  sterilizerSterilizerType,
}: Props) => {
  const doc = new jsPDF({
    unit: "mm",
    format: [210, 297],
    putOnlyUsedFonts: true,
  });

  let y = 35;

  doc.addImage("/logo-gamma-biolabs.png", "PNG", 10, 10, 31.25, 16.875);
  doc.addImage("/logo-sporigam.png", "PNG", 165, 16, 36.25, 6.125);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Guadalajara, Jalisco, ${formatDate(date)}`, 126, y); // 35

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Reporte de análisis de indicadores biológicos (IB)", 10, (y += 10)); // 45
  doc.text(`Reporte No.: ${reportNumber} - ID: ${id}`, 10, (y += 10)); // 55

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Cliente: ${userName} ${userLastName}`, 10, (y += 10)); // 65
  doc.text(`No. de cliente: ${userId}`, 10, (y += 5)); // 70

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("Datos del autoclave", 10, (y += 10)); // 80
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Tipo de esterilizador: ${sterilizerSterilizerType}`, 10, (y += 5)); // 85
  doc.text(`Marca: ${sterilizerBrand}`, 10, (y += 5)); // 90
  doc.text(`Modelo: ${sterilizerModel}`, 10, (y += 5)); // 95
  doc.text(`No. de serie: ${sterilizerSerialNumber}`, 10, (y += 5)); // 100

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("Datos de la prueba", 10, (y += 10)); // 110
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Lote de IBs utilizados: Sporigam 90`, 10, (y += 5)); // 115
  doc.text(`Fecha de caducidad de IBs utilizados: 03/22`, 10, (y += 5)); // 120
  doc.text(`Organismo: Geobacillus stearothermophilus`, 10, (y += 5)); // 125
  doc.text(
    `Los indicadores biológicos mencionados fueron sometidos a un proceso de esterilización a vapor a 121ºC por 20 min`,
    10,
    (y += 5)
  ); // 130
  doc.text(
    `efectivos en el esterilizador mencionado en este reporte.`,
    10,
    (y += 5)
  ); // 135
  doc.text(`Tiempo de incubación de IBs: 72 horas.`, 10, (y += 5)); // 140
  doc.text(`Temperatura de incubación: 56ºC.`, 10, (y += 5)); // 145

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("Resultado de la prueba", 10, (y += 10)); // 155
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Vial 1: ${resultVial1}`, 10, (y += 5)); // 160
  doc.text(`Vial 2: ${resultVial2}`, 10, (y += 5)); // 165
  doc.text(`Vial 3: ${resultVial3}`, 10, (y += 5)); // 170
  doc.text(`Control positivo: Con crecimiento`, 10, (y += 5)); // 175

  doc.text(`Resultado de la prueba: Excelente`, 10, (y += 10)); // 185
  doc.text(`Comentarios: ${comments}`, 10, (y += 5)); // 190
  doc.text(
    `Esto indica que se esterilizaron correctamente y que el equipo funciona correctamente.`,
    10,
    (y += 5)
  ); // 195

  doc.text("Atentamente", 90, (y += 10)); // 205
  doc.text("Ing. Ander Gentry Torfer, PDEng", 74, (y += 15)); // 220
  doc.text("Director de reportes de Gamma Biolabs", 68, (y += 5)); // 225

  doc.text(
    "Este reporte es válido por dos meses a partir de su fecha de emisión.",
    10,
    (y += 10)
  ); // 235
  doc.text(
    "Solamente es válido para el autoclave que se indica en él.",
    10,
    (y += 5)
  ); // 240

  doc.text(
    "Siguiente revisión del autoclave: 19 de noviembre de 2023",
    10,
    (y += 10)
  ); // 250
  doc.text(
    "Cualquier duda, comuníquese a los teléfonos en el pie de página.",
    10,
    (y += 5)
  ); // 255

  doc.text(
    "El método de validación de autoclaves de este reporte está basado en:",
    10,
    (y += 10)
  ); // 265
  doc.text(
    "NOM-013-SSA2-2015 Para la prevención y control de enfermedades bucales",
    10,
    (y += 5)
  ); // 270
  doc.text(
    "ISO 11138 Sterilization of health care products - Biological indicators",
    10,
    (y += 5)
  ); // 275

  doc.setFont("helvetica", "italic");
  doc.setFontSize(8);
  doc.text(
    "OFICINA GUADALAJARA: Periférico poniente 814A, Col. Sta. Margarita, Zapopan, Jalisco. Tel: 33 33646285",
    38,
    (y += 10)
  ); // 285
  doc.text(
    "OFICINA MEXICO: Ventura G. Tena No. 250, Col. Ampliación Asturias CDMX. Tel:55 50870297 / 55 50870287",
    37,
    (y += 5)
  ); // 290
  doc.text("www.gammabiolabs.com", 87, (y += 5)); // 295

  var blob = doc.output("blob");
  window.open(URL.createObjectURL(blob));

  doc.save(`Reporte - ${reportNumber}.pdf`);
};
