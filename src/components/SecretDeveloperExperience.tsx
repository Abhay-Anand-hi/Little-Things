import React from 'react';
import { SecretRevealTransition } from './SecretRevealTransition';

interface SecretDeveloperExperienceProps {
  isOpen: boolean;
  onClose: () => void;
  onHandoffReady?: () => void;
}

/**
 * SecretDeveloperExperience
 * Isolated secret experience container hosting the transition and reveal stages.
 */
export const SecretDeveloperExperience: React.FC<SecretDeveloperExperienceProps> = ({
  isOpen,
  onClose,
  onHandoffReady
}) => {
  return (
    <SecretRevealTransition
      isOpen={isOpen}
      onClose={onClose}
      onHandoffReady={onHandoffReady}
    />
  );
};

