import { TestBed } from '@angular/core/testing';
import { LinksService } from './links.service';
import { Link } from '../models/link.model';
import linksData from '../content/links.json';

describe('LinksService', () => {
  let service: LinksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinksService);
  });

  describe('links signal', () => {
    it('should return all links from JSON on initialization', () => {
      const links = service.links();
      expect(links).toHaveLength(linksData.length);
      expect(links).toEqual(linksData);
    });

    it('should have all required fields on every link', () => {
      const requiredFields: (keyof Link)[] = [
        'id',
        'title',
        'url',
        'description',
        'category',
        'tags',
      ];

      for (const link of service.links()) {
        for (const field of requiredFields) {
          expect(link[field]).toBeDefined();
        }
      }
    });

    it('should be readonly (not directly assignable)', () => {
      // The links signal is readonly — it should not have a .set method
      expect((service.links as any).set).toBeUndefined();
      expect((service.links as any).update).toBeUndefined();
    });
  });

  describe('isLoading signal', () => {
    it('should be exposed and initially false', () => {
      expect(service.isLoading()).toBe(false);
    });

    it('should be readonly (not directly assignable)', () => {
      expect((service.isLoading as any).set).toBeUndefined();
      expect((service.isLoading as any).update).toBeUndefined();
    });
  });

  describe('categories computed signal', () => {
    it('should return sorted unique categories', () => {
      const categories = service.categories();
      const expectedCategories = [
        ...new Set(linksData.map(l => l.category)),
      ].sort();

      expect(categories).toEqual(expectedCategories);
    });

    it('should not contain duplicates', () => {
      const categories = service.categories();
      const unique = new Set(categories);
      expect(unique.size).toBe(categories.length);
    });
  });

  describe('linksByCategory computed signal', () => {
    it('should group links correctly by category', () => {
      const grouped = service.linksByCategory();

      // Should have same number of categories
      expect(grouped.size).toBe(service.categories().length);

      // Every link should appear in its correct category group
      for (const link of service.links()) {
        const categoryLinks = grouped.get(link.category);
        expect(categoryLinks).toBeDefined();
        expect(categoryLinks).toContainEqual(link);
      }
    });

    it('should contain all links across all groups', () => {
      const grouped = service.linksByCategory();
      let totalLinks = 0;
      for (const links of grouped.values()) {
        totalLinks += links.length;
      }
      expect(totalLinks).toBe(service.links().length);
    });
  });
});
