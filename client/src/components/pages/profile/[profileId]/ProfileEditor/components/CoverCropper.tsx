import { useAppDispatch, useAppSelector } from '@/store';
import { closeImage, setImage } from '@/store/features';
import getCroppedImg from '@/utils/cropImage';
import React, { useCallback, useState } from 'react';
import { Button } from 'react-daisyui';
import Cropper, { Area } from 'react-easy-crop';
import { MdDataSaverOn } from 'react-icons/md';

export const CoverCropper: React.FC = () => {
  const dispatch = useAppDispatch();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const { avatar, cover, type } = useAppSelector((state) => state.image);
  const image = type === 'cover' ? cover : avatar;
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [],
  );
  const showCroppedImage = useCallback(async () => {
    const croppedImage = await getCroppedImg(image, croppedAreaPixels!);
    dispatch(setImage({ image: croppedImage || '', type }));
    dispatch(closeImage());
  }, [image, croppedAreaPixels, dispatch, type]);
  return (
    <div>
      <div className="relative h-[500px]">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={type === 'cover' ? 16 / 6 : 1 / 1}
          cropShape={type === 'cover' ? 'rect' : 'round'}
          showGrid={false}
          zoomWithScroll={true}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
          objectFit="horizontal-cover"
          style={{
            cropAreaStyle: {
              borderColor: 'oklch(var(--p)',
              borderWidth: type === 'cover' ? '3px 0' : '3px',
            },
            containerStyle: {
              backgroundColor: 'oklch(var(--b3))',
            },
          }}
        />
      </div>
      <Button
        type="button"
        color="primary"
        endIcon={<MdDataSaverOn className="text-2xl" />}
        className="capitalize w-full text-lg font-bold"
        onClick={showCroppedImage}
      >
        Apply
      </Button>
    </div>
  );
};
