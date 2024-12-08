import { useRef, useState } from 'react';

import cnyBody from '../../assets/images/cny-body.webp';
import cnyTop from '../../assets/images/cny-top.png';
import successLogo from '../../assets/images/svg/successLogo.svg';
import uploadLogo from '../../assets/images/svg/uploadLogo.svg';
import ButtonComponent from '../../components/ButtonComponent';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

const Upload: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [pdfUrl, setPdfUrl] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDisplayImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setError('');
      setImageUrl('');
      setPdfUrl('');

      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        setError('Unsupported file type. Please upload PDF, JPEG, JPG, or PNG.');
        return;
      }

      setImageFile(file);

      const reader = new FileReader();
      reader.onload = res => {
        if (file.type.startsWith('image/')) {
          setImageUrl(res.target?.result as string);
        } else if (file.type === 'application/pdf') {
          setPdfUrl(res.target?.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitReceipt = async () => {
    if (!imageFile) {
      setError('Please select a file first.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('receipt', imageFile);
      setImageFile(null);
      setImageUrl('');
      setPdfUrl('');
    } catch (uploadError) {
      setError('Upload failed. Please try again.');
      console.error(uploadError);
    } finally {
      setLoading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div id="page" className="overflow-y-auto">
      <div className="absolute flex justify-between w-full">
        <Header />
      </div>
      <div className="relative z-[2]">
        <img src={cnyTop} alt="gif" className="w-full h-full" />
      </div>

      <div className="relative -mt-[115px] overflow-hidden z-[3] pb-[73px]">
        <img
          src={cnyBody}
          alt="main-bg"
          className="absolute w-full min-h-screen top-0 left-0"
        />

        <div className="pt-[110px] flex flex-col items-center justify-between relative w-[80%] mx-auto">
          <p className="text-white text-[26px] font-bold pt-3">Upload Receipt</p>
          <p className="heading-2 text-center">Upload a photo of your receipt</p>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleDisplayImage}
            accept="image/jpeg,image/jpg,image/png,application/pdf"
            className="hidden"
          />

          {imageFile ? (
            <div className="w-full mt-4">
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Receipt Preview"
                  className="w-full max-h-[300px] object-contain rounded-[10px]"
                />
              )}
              {pdfUrl && (
                <iframe
                  src={pdfUrl}
                  title="PDF Preview"
                  className="w-full h-[300px] rounded-[10px]"
                />
              )}
            </div>
          ) : (
            <div
              onClick={triggerFileInput}
              className="w-full h-[150px] mt-4 border-dashed border-2 rounded-[10px] content-center text-center cursor-pointer"
              style={{ backgroundColor: '#7D1A21' }}
            >
              <img src={uploadLogo} className="mx-auto" alt="Upload" />
              <p className="my-2 mx-auto text-white font-bold underline text-[16px]">
                Click to Upload
              </p>
              <p className="mx-auto text-white text-[12px]">
                *Supported image format: PDF, JPEG, JPG, PNG only
              </p>
            </div>
          )}

          {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
        </div>

        <div className="footer-div">
          <div className="absolute z-40 w-full mx-auto text-center top-[140px]">
            <ButtonComponent
              buttonText="SUBMIT RECEIPT"
              buttonType="submit"
              buttonClass="button-component"
              buttonFunction={handleSubmitReceipt}
              modal={{
                logo: successLogo,
                title: 'Successful!',
                message:
                  'Your receipt has been successfully uploaded and will be validated within 5 working days.',
                modalButtonText: 'OK',
                modalButtonClass: 'bg-[#02BC7D] hover:bg-green-700',
              }}
            />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Upload;
