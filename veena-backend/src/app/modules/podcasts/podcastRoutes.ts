import { Router } from 'express';
import {
  getPodcasts,
  createPodcast,
  updatePodcast,
  deletePodcast,
  getEpisodes,
  addEpisode,
  updateEpisode,
  deleteEpisode,
} from './podcastController';
import { upload } from '../../config/cloudinary';

const router = Router();

router.get('/', getPodcasts);

router.post('/', upload.single('cover'), createPodcast);

router.put('/:id', upload.single('cover'), updatePodcast);

router.delete('/:id', deletePodcast);

router.get('/:id/episodes', getEpisodes);

router.post('/:id/episodes', addEpisode);

router.put('/:id/episodes/:episodeId', updateEpisode);

router.delete('/:id/episodes/:episodeId', deleteEpisode);

export const podcastRouter = router;
